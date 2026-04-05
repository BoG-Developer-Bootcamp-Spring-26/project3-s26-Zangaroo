

export default function Home() {
  return (
    <div>
        <header>
            <img src="/images/logo.png"/>
            <h1>Progress</h1>
        </header>
        <main>
            <h2>Login</h2>
            <div className="">
                <form>
                    <div className="">
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email"/>
                    </div>
                    <div className="">
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" />
                    </div>
                    <button type="submit">Log in</button>
                </form>
            </div>
            <p>Don't have an account? Sign up</p>
        </main>
        <footer></footer>
    </div>
  );
}