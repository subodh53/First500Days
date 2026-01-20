export default function FrequentUsers({ users }) {
    return (
        <div>
            <h3>Users Active for 4 or More Days</h3>
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