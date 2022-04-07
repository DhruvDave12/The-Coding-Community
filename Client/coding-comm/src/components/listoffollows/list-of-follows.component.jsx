import React from "react";
import './list-of-follows.styles.scss';
import { useLocation } from "react-router";

const ListOfFollows = () => {
    
    const location = useLocation();

    const { currFollows } = location.state;
    return (
        <div className="list-of-follows">
            {
                
                currFollows.map(follow => (
                    <div className="particular-use">
                        {
                            follow.username
                        }
                    </div>
                ))
               
            }
        </div>
    )
}

export default ListOfFollows;