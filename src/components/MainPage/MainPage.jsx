import style from './MainPage.module.scss'
import {Link} from "react-router-dom";

export const MainPage = props => {
    return (
        <div>
            <div style={{maxWidth: '1140px', margin: '0 auto'}}>
                <header className={style.header}>
                    <div>ResearchGate</div>
                    <nav className={style.header__right}>
                        <Link to='/login'>Log in</Link>
                        <Link to='/registration'>Join for free</Link>
                    </nav>
                </header>

            </div>
        </div>
    )
}