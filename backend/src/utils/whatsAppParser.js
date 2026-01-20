import dayjs from 'dayjs';

// Parse WhatsApp Chat and Export Analytics
export function parseWhatsAppChat(text) {
    const lines = text.split('\n');

    // For day-wise stats
    const dailyStats = {};

    //Show which days each user was active
    const userActiveDays = new Map();

    //Calculate last 7 days
    // First pass: find latest date in the chat
let latestDate = null;

for (const line of lines) {
  if (!line.includes(' - ')) continue;

  const datePart = line.split(' - ')[0];
  const dateStr = datePart.split(',')[0];
  const parsed = dayjs(dateStr, ['M/D/YY', 'M/D/YYYY']);

  if (parsed.isValid()) {
    if (!latestDate || parsed.isAfter(latestDate)) {
      latestDate = parsed;
    }
  }
}

// If no valid dates found, return empty result
if (!latestDate) {
  return { last7Days: [], frequentUsers: [] };
}

// Build last 7 days based on latest date in chat
const last7Days = new Set();
for (let i = 0; i < 7; i++) {
  last7Days.add(
    latestDate.subtract(i, 'day').format('YYYY-MM-DD')
  );
}

    for (const line of lines) {
        if (!line.includes(' - ')) continue;

        //Split Line into DateTime and Content
        const parts = line.split(' - ');
        if (parts.length !== 2) continue;

        const dateTimePart = parts[0];
        const content = parts[1];

        //Extract Date
        const date = extractDate(dateTimePart);
        if (!date || !last7Days.has(date)) continue;

        //Initialize Stats For The Day
        if (!dailyStats[date]) {
          dailyStats[date] = {
          activeUsers: new Set(),
          newUsers: new Set()
        };
      }

      //Join Event
      if (isJoinEvent(content)) {
        const joinedUser = extractJoinedUser(content);
        if (joinedUser) {
            dailyStats[date].newUsers.add(joinedUser);
        }
        continue;
      }

      //Message Event
      if (isMessage(content)) {
        const sender = extractSender(content);

        dailyStats[date].activeUsers.add(sender);

        if (!userActiveDays.has(sender)) {
            userActiveDays.set(sender, new Set());
        }
        userActiveDays.get(sender).add(date);
      }
    }

    const last7DaysData = [...last7Days].sort().map(date => ({
        date,
        activeUsers: dailyStats[date]?.activeUsers.size || 0,
        newUsers: dailyStats[date]?.newUsers.size || 0
    }));

    const frequentUsers = [...userActiveDays.entries()]
        .filter(([_, days]) => days.size >= 4)
        .map(([user, days]) => ({
            user,
            activeDays: days.size
        }));

    return {
       last7Days: last7DaysData,
       frequentUsers
   };
}

/********* HELPER FUNCTIONS **********/

function extractDate(dateTimePart) {
    const datePart = dateTimePart.split(',')[0];
    const parsed = dayjs(datePart, ['M/D/YY', 'M/D/YYYY']);
    return parsed.isValid() ? parsed.format('YYYY-MM-DD') : null;
}

function isJoinEvent(content) {
    // Join Event Never has ":"
    if (content.includes(":")) return false;

    return content.includes(' joined') || content.includes(' added');
}

function extractJoinedUser(content) {
    // "+91 23 73889 joined using this group's invite link"
    // "+91 16 91994 added you"

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