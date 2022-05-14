import axios from "axios";
import React, { useEffect , useState} from "react";
import { useLocation } from "react-router";
import './boughtCourse.styles.scss';
import { useSearchParams } from "react-router-dom";


const BoughtCourse = () => {
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const hashKey = searchParams.get('key');
    const [hasBought, setHasBought] = useState(false);
    
    const course = location.state;
    useEffect(() => {
        const securelyCheck = async () => {
            const res = await axios.post('https://the-coding-community.herokuapp.com/course/check', {
                key: hashKey
            },{
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });

            setHasBought(res.data.data);
        }

        securelyCheck();
    }, []);

    

    return (
        <div className="bought__course">
            {
                hasBought ? 
                <iframe src={course.videos[1].url}></iframe>
                :
                <h1>You dont have the access to this course.</h1>
            }
        </div>
    )
}

export default BoughtCourse;