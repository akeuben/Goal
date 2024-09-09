export default function ProfilePage({params}: {params: {username: string}}) {
    return <h1>Profile: {params.username}</h1>
}
