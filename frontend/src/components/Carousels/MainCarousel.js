import React, { useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import { RxDotFilled } from 'react-icons/rx'

const MainCarousel = () => {

    const slides = [
        {
            url: '1.jpg'
        },
        {
            url: '2.jpg'
        },
        {
            url: '1.jpg'
        }
    ]
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSide = currentIndex === 0;
        const newIndex = isFirstSide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex)
    };
    const nextSlide = () => {
        const isLastSide = currentIndex === slides.length - 1;
        const newIndex = isLastSide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex)
    };
    const goToSlide = (slideIndex) =>{
        setCurrentIndex(slideIndex);
    };
    // useEffect(() => {
    //     setTimeout(() => {
    //         const newIndex = slides.length - 1;
    //         setCurrentIndex(newIndex)
    //         console.log(newIndex)
    //     }, 5000);
    // });

    return (
        <>
            <div className="max-w-[1400px] h-[780px] w-full m-auto p-5 py-10 pt-20 relative group">
                <div style={{ backgroundImage: `url(${slides[currentIndex].url})` }} className="w-full h-full rounded-xl bg-center bg-cover duration-500"></div>

                {/* Left Arrow */}
                <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 text-white cursor-pointer">
                    <BsChevronCompactLeft onClick={nextSlide} size={30} className="shadow-4xl" />
                </div>

                {/* Right Arrow */}
                <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                    <BsChevronCompactRight onClick={prevSlide} size={30} />
                </div>
                <div className="flex top-4 justify-center py-2 text-[#7570ff]">
                    {slides.map((slide, slideIndex) => (
                        <div key={slideIndex} onClick={() => goToSlide(slideIndex)} className="text-2xl cursor-pointer">
                            <RxDotFilled />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
export default MainCarousel;









// const scrollLeft = () => {
//     document.getElementById("img").scrollLeft -= 440;
// };
// const scrollRight = () => {
//     document.getElementById("img").scrollLeft += 440;
// };
{/* <div className="grid place-items-center bg-[#898888c9] ">
                <h1 className="py-3 font-semibold text-2xl text-center">Growing learning </h1>

                <div id="img" className="flex content-center w-[80%] h-80 p-4 gap-10 overflow-x-auto  scroll-smooth scrollbar-hide ">
                    <img src="https://img.freepik.com/free-vector/recruit-agent-analyzing-candidates_74855-4565.jpg?size=626&ext=jpg&ga=GA1.2.1812261131.1679748520&semt=ais" className="h-60" />
                    <img src="https://img.freepik.com/premium-vector/online-cv-application-job-search-concept-with-people-applying-resume-flat-vector_125133-1603.jpg?size=626&ext=jpg&ga=GA1.2.1812261131.1679748520&semt=ais" className="h-60  w-[100%]" />
                    <img src="https://img.freepik.com/premium-vector/job-interview-online-service-platform-candidate-hr-manager-business-man-woman-table-vector-illustration-conversation-career-human-resource-concept_2175-919.jpg?size=626&ext=jpg&ga=GA1.2.1812261131.1679748520&semt=ais" className="h-60" />
                    <img src="https://img.freepik.com/free-vector/choice-worker-concept_23-2148626348.jpg?size=626&ext=jpg&ga=GA1.2.1812261131.1679748520&semt=ais" className="h-60 w-[100%]" />
                    <img src="https://img.freepik.com/free-vector/recruitment-agency-searching-job-applicants_1262-19873.jpg?size=626&ext=jpg&ga=GA1.2.1812261131.1679748520&semt=ais" className="h-60  w-[100%]" />
                    <img src="https://img.freepik.com/free-vector/personal-site-concept-illustration_114360-2577.jpg?size=626&ext=jpg&ga=GA1.1.1812261131.1679748520&semt=ais" className="h-60" />
                </div>
            </div>
            <div className="text-red-900 text-3xl">
                <button onClick={scrollLeft} className="p-2 m-2 bg-white rounded-full" >
                    <h1>adfads</h1>
                </button>
                <button onClick={scrollRight} className="p-2 m-2 bg-white rounded-full"  >
                    <FiChevronRight />
                </button>
            </div> */}