import React from 'react';
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";


const SimilarProCarousel = () => {

    const scrollLeft = () => {
        document.getElementById("img").scrollLeft -= 440;
    };
    const scrollRight = () => {
        document.getElementById("img").scrollLeft += 440;
    };

    return (
        <div className=''>
            <h1 className='text-4xl font-bold tracking-widest text-center py-10 text-[#7570ff] mt-9 uppercase'>You May Also Like</h1>
            <div className="grid place-items-center grid-cols-8">
                <button onClick={scrollLeft} className="p-2 m-2 bg-white rounded-full" >
                    <FiChevronLeft />
                </button>
                <div id="img" className="flex content-center w-[90%] h-80 p-4 gap-10 overflow-x-auto scroll-smooth scrollbar-hide col-span-6">
                    <img src="https://img.freepik.com/free-vector/recruit-agent-analyzing-candidates_74855-4565.jpg?size=626&ext=jpg&ga=GA1.2.1812261131.1679748520&semt=ais" className="h-60" />
                    <img src="https://img.freepik.com/premium-vector/online-cv-application-job-search-concept-with-people-applying-resume-flat-vector_125133-1603.jpg?size=626&ext=jpg&ga=GA1.2.1812261131.1679748520&semt=ais" className="h-60  w-[100%]" />
                    <img src="https://img.freepik.com/premium-vector/job-interview-online-service-platform-candidate-hr-manager-business-man-woman-table-vector-illustration-conversation-career-human-resource-concept_2175-919.jpg?size=626&ext=jpg&ga=GA1.2.1812261131.1679748520&semt=ais" className="h-60" />
                    <img src="https://img.freepik.com/free-vector/choice-worker-concept_23-2148626348.jpg?size=626&ext=jpg&ga=GA1.2.1812261131.1679748520&semt=ais" className="h-60 w-[100%]" />
                    <img src="https://img.freepik.com/free-vector/recruitment-agency-searching-job-applicants_1262-19873.jpg?size=626&ext=jpg&ga=GA1.2.1812261131.1679748520&semt=ais" className="h-60  w-[100%]" />
                    <img src="https://img.freepik.com/free-vector/personal-site-concept-illustration_114360-2577.jpg?size=626&ext=jpg&ga=GA1.1.1812261131.1679748520&semt=ais" className="h-60" />
                </div>
                <button onClick={scrollRight} className="p-2 m-2 bg-white rounded-full"  >
                    <FiChevronRight />
                </button>
            </div>
        </div>
    );
}

export default SimilarProCarousel;