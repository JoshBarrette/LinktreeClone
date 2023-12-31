import { api } from "~/trpc/server";
import NavBar from "./_components/NavBar";

export default async function Home() {
    const posts = await api.post.hello.query();

    return (
        <main>
            <div>
                <NavBar />
                <p>Linktree Clone</p>
                {posts.greeting}
            </div>
        </main>
    );
}
