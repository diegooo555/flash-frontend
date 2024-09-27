import ActualTime from "./ActualTime";
import PropTypes from "prop-types";

const Profile = ({monthName, nextWeek, prevWeek}) => {
    return(
        <div className="w-full h-[15%] flex items-center justify-around gap-4 max-md-h-auto max-md:max-h-20">
            <div className="flex flex-col justify-center items-center h-full w-40 max-md:w-30">
                <span className="font-bold text-2xl max-md:text-xl text-blue-600 max-sm:text-base">
                    {monthName}
                </span>
                <div className="flex w-full justify-center items-center gap-4">
                    <button className="w-10 h-10 p-3 rounded-full bg-blue-300 flex justify-center items-center text-white font-bold text-2xl max-md:w-9 max-md:h-9" onClick={prevWeek}>
                        <img src="/arrow.png" alt="flecha" className="h-full w-full rotate-180 "/>
                    </button>
                    <button onClick={nextWeek} className="w-10 h-10 p-3 rounded-full bg-blue-300 flex justify-center items-center text-white font-bold text-2xl max-md:w-9 max-md:h-9"> 
                        <img src="/arrow.png" alt="flecha" className="h-full w-full"/>
                    </button>
                </div>
            </div>
            <div className="h-full flex justify-center items-center">
                <ActualTime/>
            </div>
            <div className="text-2xl text-purple-500">Diego</div>
        </div>
    )
}

Profile.propTypes = {
    monthName: PropTypes.string.isRequired,
    nextWeek: PropTypes.func.isRequired,
    prevWeek: PropTypes.func.isRequired,
}

export default Profile;