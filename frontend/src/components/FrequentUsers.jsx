export default function FrequentUsers({ users }) {
    return (
        <div>
            <h2>Users Active for 4 or More Days in Last 7 Days</h2>
            <ul>
                {users.map(u => (
                    <li key={u.user}>
                        {u.user} - {u.activeDays} days
                    </li>
                ))}
            </ul>
        </div>
    );
}