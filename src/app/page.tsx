import { db } from "~/server/db";

export default async function Home() {
    const posts = await db.post.findMany();

    return (
        <main className="flex">
            <div className="m-auto">
                <p>Linktree Clone</p>
                {posts.map((post, k) => (
                    <p key={k}>{post.name}</p>
                ))}
            </div>
        </main>
    );
}
