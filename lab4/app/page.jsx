import TodoApp from "../components/TodoApp";

export default function Home() {
    return (
        <main className="min-h-screen gradient-bg">
            <div className="container mx-auto px-4 py-12">
                <TodoApp />
            </div>
        </main>
    );
}
