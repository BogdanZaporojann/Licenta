import style from './MainPage.module.scss'
import { Link } from "react-router-dom";
import indus from "../../assets/img/indus/indian_picture.jpg"
import search from "../../assets/svg/search.svg"
import scients_icon_1 from "../../assets/svg/circle_1.svg"
import classNames from 'classnames';
export const MainPage = props => {
    return (
        <div>
            <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
                <header className={style.header}>
                    <div>BrainWave</div>
                    <nav className={style.header__right}>
                        <Link to='/login'>Log in</Link>
                        <Link to='/registration'>Join for free</Link>
                    </nav>
                </header>

                <section className={style.flex_space_between}>
                    <div className={style.width_450}>
                        <h2>
                            Discover scientific knowledge and stay connected to the world of science
                        </h2>

                        <span className={classNames(style.flex_center, style.button)}>
                            Join for free
                        </span>
                    </div>
                    <div>
                        <img className={style.foto_scientits} src={indus} alt="Indus" />
                    </div>
                </section>

                <section>
                    <div className={style.flex_space_between}>
                        <img className={style.scrince_icon_1} src={scients_icon_1} alt="circle 1" />
                        <div className={classNames(style.flex_center, style.input_box, style.paddin20)}>
                            <img className={style.searchIcon} src={search} alt="search" />
                            <input className={classNames(style.withoutBorder, style.someInput)} type="text" placeholder='Search publication' />
                        </div>
                    </div>
                </section>

            </div>
        </div>
    )
}