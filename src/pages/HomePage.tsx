import Navigation from "../components/Navigation";


const HomePage = () => {

    return (
        <div className="relative w-full">
            <Navigation />

            <div 
            className="w-full h-[80vh] relative bg-[url('/src/assets/bg.jpg')] bg-no-repeat bg-cover ">
                <h1 className="text-[20px] text-center font-bold uppercase my-3 absolute top-[50%] left-[50%] transform -translate-x-[50%] whitespace-nowrap">
                    Quiz Web  Application
                </h1>

            </div>


        </div>
    )
}

export default HomePage;