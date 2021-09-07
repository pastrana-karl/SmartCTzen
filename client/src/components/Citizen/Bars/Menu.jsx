import "./menu.css"
export default function Menu() {
    return (
        <div className="mainMenu">
            <div className="menuMid">
                <ul className="menuList">
                    <li className="menuListItem">Profile</li>
                    <li className="menuListItem">Proposals</li>
                    <li className="menuListItem">Reports</li>
                    <li className="menuListItem">Projects</li>
                    <li className="menuListItem">Logout</li>
                </ul>
            </div>
        </div>
    )
}