import dayjs from 'dayjs';

// Parse WhatsApp Chat and Export Analytics
export function parseWhatsAppChat(text) {
  const lines = text.split('\n');

  // Last 7 days stats
  const last7DayStats = {};

  // Global daily stats
  const globalDailyStats = {};

  // Track active days per user (LAST 7 DAYS ONLY)
  const userActiveDays = new Map();

  /* ---------------- FIND LATEST DATE ---------------- */

  let latestDate = null;

  for (const line of lines) {
    if (!line.includes(' - ')) continue;

    const dateTimePart = line.split(' - ')[0];
    const parsed = dayjs(dateTimePart, [
      'M/D/YY, h:mm A',
      'M/D/YYYY, h:mm A'
    ]);

    if (parsed.isValid()) {
      if (!latestDate || parsed.isAfter(latestDate)) {
        latestDate = parsed;
      }
    }
  }

  if (!latestDate) {
    return { last7Days: [], frequentUsers: [], dailyStats: {} };
  }

  /* ---------------- BUILD LAST 7 DAYS ---------------- */

  const last7Days = new Set();
  for (let i = 0; i < 7; i++) {
    last7Days.add(
      latestDate.clone().subtract(i, 'day').format('YYYY-MM-DD')
    );
  }

  /* ---------------- MAIN PARSING LOOP ---------------- */

  for (const line of lines) {
    if (!line.includes(' - ')) continue;

    const parts = line.split(' - ');
    if (parts.length !== 2) continue;

    const dateTimePart = parts[0];
    const content = parts[1];

    const date = extractDate(dateTimePart);
    if (!date) continue;

    /* ---- Initialize GLOBAL stats ---- */
    if (!globalDailyStats[date]) {
      globalDailyStats[date] = {
        activeUsers: new Set(),
        newUsers: new Set()
      };
    }

    /* ---- Initialize LAST 7 DAYS stats ---- */
    if (last7Days.has(date) && !last7DayStats[date]) {
      last7DayStats[date] = {
        activeUsers: new Set(),
        newUsers: new Set()
      };
    }

    /* ---- JOIN EVENT ---- */
    if (isJoinEvent(content)) {
      const joinedUser = extractJoinedUser(content);
      if (joinedUser) {
        globalDailyStats[date].newUsers.add(joinedUser);

        if (last7Days.has(date)) {
          last7DayStats[date].newUsers.add(joinedUser);
        }
      }
      continue;
    }

    /* ---- MESSAGE EVENT ---- */
    if (isMessage(content)) {
      const sender = extractSender(content);

      globalDailyStats[date].activeUsers.add(sender);

      if (last7Days.has(date)) {
        last7DayStats[date].activeUsers.add(sender);

        // ✅ FIX: Track active days ONLY for last 7 days
        if (!userActiveDays.has(sender)) {
          userActiveDays.set(sender, new Set());
        }
        userActiveDays.get(sender).add(date);
      }
    }
  }

  /* ---------------- RESPONSE BUILDING ---------------- */

  const last7DaysData = [...last7Days].sort().map(date => ({
    date,
    activeUsers: last7DayStats[date]?.activeUsers.size || 0,
    newUsers: last7DayStats[date]?.newUsers.size || 0
  }));

  const frequentUsers = [...userActiveDays.entries()]
    .filter(([_, days]) => days.size >= 4)
    .map(([user, days]) => ({
      user,
      activeDays: days.size
    }));

  const dailyStatsResponse = {};
  for (const date in globalDailyStats) {
    dailyStatsResponse[date] = {
      activeUsers: globalDailyStats[date].activeUsers.size,
      newUsers: globalDailyStats[date].newUsers.size
    };
  }

  return {
    last7Days: last7DaysData,
    frequentUsers,
    dailyStats: dailyStatsResponse
  };
}

/* ---------------- HELPER FUNCTIONS ---------------- */

function extractDate(dateTimePart) {
  const parsed = dayjs(dateTimePart, [
    'M/D/YY, h:mm A',
    'M/D/YYYY, h:mm A'
  ]);
  return parsed.isValid() ? parsed.format('YYYY-MM-DD') : null;
}

function isJoinEvent(content) {
  if (content.includes(':')) return false;
  return content.includes(' joined') || content.includes(' added');
}

function extractJoinedUser(content) {
  if (content.includes(' joined')) {
    return content.split(' joined')[0].trim();
  }
  if (content.includes(' added')) {
    return content.split(' added')[0].trim();
  }
  return null;
}

function isMessage(content) {
  return content.includes(':');
}

function extractSender(content) {
  return content.split(':')[0].trim();
}