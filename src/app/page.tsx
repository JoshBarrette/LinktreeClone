import { api } from "~/trpc/server";
import NavBar from "./_components/NavBar";
import { getServerSession } from "next-auth";

export default async function Home() {
    const posts = await api.post.hello.query();
    const session = await getServerSession();

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
