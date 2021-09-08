import "./menu.css"
import React,{useEffect} from "react";
import { NavLink } from "react-router-dom";
// export default function Menu() {
//     return (
//         <div className="mainMenu">
//             <div className="menuMid">
//                 <ul className="menuList">
//                     <li className="menuListItem">Profile</li>
//                     <li className="menuListItem">Proposals</li>
//                     <li className="menuListItem">Reports</li>
//                     <li className="menuListItem">Projects</li>
//                     <li className="menuListItem">Logout</li>
//                 </ul>
//             </div>
//         </div>
//     )
// }

function animation(){
    var tabsNewAnim = $('#navbarSupportedContent');
    var activeItemNewAnim = tabsNewAnim.find('.active');
    var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
    var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
    var itemPosNewAnimTop = activeItemNewAnim.position();
    var itemPosNewAnimLeft = activeItemNewAnim.position();
    $(".hori-selector").css({
      "top":itemPosNewAnimTop.top + "px", 
      "left":itemPosNewAnimLeft.left + "px",
      "height": activeWidthNewAnimHeight + "px",
      "width": activeWidthNewAnimWidth + "px"
    });
    $("#navbarSupportedContent").on("click","li",function(e){
      $('#navbarSupportedContent ul li').removeClass("active");
      $(this).addClass('active');
      var activeWidthNewAnimHeight = $(this).innerHeight();
      var activeWidthNewAnimWidth = $(this).innerWidth();
      var itemPosNewAnimTop = $(this).position();
      var itemPosNewAnimLeft = $(this).position();
      $(".hori-selector").css({
        "top":itemPosNewAnimTop.top + "px", 
        "left":itemPosNewAnimLeft.left + "px",
        "height": activeWidthNewAnimHeight + "px",
        "width": activeWidthNewAnimWidth + "px"
      });
    });
  }

const navbarCitizen = props => {
    return(
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

export default navbarCitizen;