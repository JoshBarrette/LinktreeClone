import { db } from "~/server/db";
import NavBar from "./_components/NavBar";

export default async function Home() {
    const posts = await db.post.findMany();

    return (
        <main>
            <div>
                <NavBar />
                <p>Linktree Clone</p>
                {posts.map((post, k) => (
                    <p key={k}>{post.name}</p>
                ))}
            </div>
        </main>
    );
}
