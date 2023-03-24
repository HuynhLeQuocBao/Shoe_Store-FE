import { Container } from "@/components/common"


export function BannerChild({ ...props }) {
    return (
        <Container>
            <div className="relative w-full h-auto font-Rokkitt">
                <img className="w-full h-full object-cover" src="/images/banner/bannerChild.jpg" alt="" />
                <div className="absolute top-10 left-10 w-auto text-[40px] font-medium">
                    <h1>{props.text}</h1>
                </div>
                <div className="w-full h-auto text-white  bg-[#616161]">
                    <ul className="w-full p-4 flex flex-grow justify-center items-center">
                        <li className="mr-8"><a href="http://google.com" >NEW ARRIVALS</a></li>
                        <li className="mr-8"><a href="" >BEST SELLERS</a></li>
                        <li className="mr-8"><a href="" >EXTENDED WIDTHS</a></li>
                        <li className="mr-8"><a href="" >SALE</a></li>
                    </ul>
                </div>
            </div>
        </Container>
    )
}