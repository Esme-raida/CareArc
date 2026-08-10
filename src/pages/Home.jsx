import { Link } from "react-router-dom"
import { ArrowRightIcon } from "@heroicons/react/24/solid"
import { Activity, Brain, ClipboardList, ClockIcon, HeartIcon, Mail, Phone, LocateIcon, Heart } from "lucide-react"
import { DocumentTextIcon, SparklesIcon, ShieldCheckIcon, DevicePhoneMobileIcon, UserGroupIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/outline"
import bgImage from "../assets/clinic_hero_dashboard.png"
import handover from "../assets/clinical_handover.png"
import physician from "../assets/physician_review.png"
import wardnurse from "../assets/ward_nurses.png"
import sarahchen from "../assets/dr_sarah_chen.png"
import rahmaali from "../assets/nurse_rahma_ali.png"
import emekaokafor from "../assets/dr_emeka_okafor.png"
import Footer from "../components/Footer";



export default function HomePage() {
    return (

        <main className="min-h-screen relative flex flex-col font-sans">
            <header className="w-full flex items-center justify-between bg-blue-100 backdrop:blur-xs px-4 fixed z-50">
                <div className="flex flex-row py-2.5 gap-2 items-center">
                    <HeartIcon className="w-8 h-8 lg:w-11 lg:h-11 px-2.5 bg-blue-500 text-white rounded-md hover:scale-105 hover:cursor-pointer hover:bg-blue-700" />
                    <div className="flex flex-col">
                        <h1 className="flex flex-row lg:text-2xl md:text-2xl  font-bold">
                            CareArc
                        </h1>
                        <span className="text-black text-xs lg:text-sm md:text-sm">Patient Intelligence System</span>
                    </div>
                </div>
                <Link to="/dashboard">
                    <button className="bg-blue-500 text-white text-xs py-2 px-2.5 rounded-lg flex flex-row gap-1 hover:scale-105 hover:cursor-pointer hover:bg-blue-700">
                        Dashboard
                        <ArrowRightIcon className="w-3 h-4" />
                    </button>
                </Link>
            </header>

            {/* HERO SECTION */}
            <section
                className="relative py-48 flex flex-col justify-center items-center text-center">
                <img
                    src={bgImage}
                    alt="Healthcare Dashboard"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/85"></div>

                <div className="relative z-10 flex flex-col items-center gap-8">
                    <button className="flex flex-row items-center gap-1 bg-blue-100 text-blue-500 text-xs lg:text-sm md: text-sm font-medium px-4 py-2 rounded-full">
                        <Activity className="h-3 w-3 text-blue-600" />
                        Longitudinal Patient Intelligence Platform
                    </button>
                    <div className="flex items-center justify-center">
                        <h1 className="md:text-3xl lg:text-4xl text-white font-bold text-center">
                            See the patient's full story over time, <br />
                            <span className="text-blue-500">
                                not just their last reading.
                            </span>
                        </h1>
                    </div>
                    <span className="text-gray-200 flex justify-center items-center text-xs md:text-lg lg:text-sm">
                        CareArc turns fragmented patient data — vitals, clinical notes,
                        <br />and trends into a clear, continuous story, with <br /> AI that surfaces what matters most.
                    </span>
                    <div className="flex gap-5 font-medium text-sm md:text-base lg: text-lg">
                        <Link to="/dashboard">
                            <button className="flex flex-row items-center gap-3 bg-blue-500 text-white text-xs md:lg:text-sm lg:text-sm px-4 py-1.5 rounded-lg hover:scale-105 hover:cursor-pointer hover:bg-blue-700">
                                Try Dashboard
                                <ArrowRightIcon className="w-3 h-4 " />
                            </button>
                        </Link>
                    </div>
                </div>
            </section>


            {/*HOW IT WORKS*/}
            <section className="flex flex-col items-center justify-center gap-5 py-15 px-5 bg-gray-100">
                <header>
                    <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold">
                        How CareArc Works
                    </h2>
                </header>
                <p className="flex items-center text-center text-sm md:text-base lg: text-lg text-gray-600 mb-10">
                    A simple clinical workflow that builds a complete picture of every patient over time
                </p>
                <div className="max-w-4/5 mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-3 justify-items-center" >
                        <div className="w-full shadow p-4 border border-gray-300 rounded-lg">
                            <ClipboardList className="h-8 w-8 mb-3 text-blue-500" />
                            <h3 className="font-semibold text-lg">1. Record Data</h3>
                            <p className="text-sm text-gray-600">
                                Clinicians log timestamped vitals and clinical notes for each patient
                            </p>
                        </div>
                        <div className="w-full shadow p-6 gap-3 border border-gray-300 rounded-lg">
                            <ArrowTrendingUpIcon className="h-8 w-8 mb-3 text-blue-500" />
                            <h3 className="font-semibold text-lg">2. Track readings</h3>
                            <p className="text-sm text-gray-600">
                                CareArc builds a longitudinal timeline showing how each patient is trending over time
                            </p>
                        </div>
                        <div className="w-full shadow p-4 gap-3 border border-gray-300 rounded-lg">
                            <Brain className="h-8 w-8 mb-3 text-blue-500" />
                            <h3 className="font-semibold text-lg">3. Monitor & Act </h3>
                            <p className="text-sm text-gray-600">
                                Intelligent status badges, delta insights, and AI summaries surface who needs attention first
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            {/*POWERFUL FEATURES SECTION*/}
            <section className="flex flex-col items-center justify-center gap-5 py-15 px-5">
                <header>
                    <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold">
                        Powerful Features
                    </h2>
                </header>
                <p className="flex items-center text-center text-sm md:text-base lg: text-lg text-gray-600 mb-10">
                    Everything your clinical team needs to track patient journeys and make informed decisions
                </p>

                <div className="max-w-4/5 mx-auto">

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-items-center" >
                        <div className="w-full shadow p-4 border border-gray-300 rounded-lg">
                            <ArrowTrendingUpIcon className="h-8 w-8 mb-3 text-blue-500" />
                            <h3 className="font-semibold text-lg">Longitudinal Vitals</h3>
                            <p className="text-sm text-gray-600">
                                Track heart rate, BP, SpO₂, temp, and resp rate across time with visual trends
                            </p>
                        </div>
                        <div className="w-full shadow p-4 gap-3 border border-gray-300 rounded-lg">
                            <ClockIcon className="h-8 w-8 mb-3 text-blue-500" />
                            <h3 className="font-semibold text-lg mb-2">Patient Timelines</h3>
                            <p className="text-sm text-gray-600">
                                Chronological health journey merging vitals recordings and clinical notes in one view
                            </p>
                        </div>
                        <div className="w-full shadow p-4 gap-3 border border-gray-300 rounded-lg">
                            <ShieldCheckIcon className="h-8 w-8 mb-3 text-blue-500" />
                            <h3 className="font-semibold text-lg mb-2">Intelligent Status</h3>
                            <p className="text-sm text-gray-600">
                                Normal ranges & delta analysis automatically derive patient status (Stable, Watch, Review)
                            </p>
                        </div>
                        <div className="w-full shadow p-4 gap-3 border border-gray-300 rounded-lg">
                            <DocumentTextIcon className="h-8 w-8 mb-3 text-blue-500" />
                            <h3 className="font-semibold text-lg mb-2">Clinical Notes</h3>
                            <p className="text-sm text-gray-600">
                                Structured notes with types — observations, treatments, reviews, and handovers
                            </p>
                        </div>
                        <div className="w-full shadow p-4 gap-3 border border-gray-300 rounded-lg">
                            <UserGroupIcon className="h-8 w-8 mb-3 text-blue-500" />
                            <h3 className="font-semibold text-lg mb-2">Multi-Patient Support Dashboard</h3>
                            <p className="text-sm text-gray-600">
                                See all patients at a glance, sorted by clinical priority with latest updates
                            </p>
                        </div>
                        <div className="w-full shadow p-4 gap-3 border border-gray-300 rounded-lg">
                            <SparklesIcon className="h-8 w-8 mb-3 text-blue-500" />
                            <h3 className="font-semibold text-lg mb-2">AI Clinical Summaries</h3>
                            <p className="text-sm text-gray-600">
                                AI-powered synthesis combines vitals, deltas, and notes into actionable handovers
                            </p>
                        </div>
                    </div>

                </div>
            </section>


            {/*WHO USES  CAREARC*/}
            <section className="flex flex-col items-center justify-center gap-8 py-15 px-5 bg-gray-100">
                <header>
                    <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold">
                        Who Uses CareArc?
                    </h2>
                </header>
                <p className="flex items-center text-center text-sm md:text-base lg: text-lg text-gray-600 mb-10">
                    Built for the clinical teams who track patients over days, not just moments.
                </p>

                <div className="max-w-4/5 mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-5 justify-items-center" >
                        <div className="w-full h-full shadow p-4 border border-gray-300 rounded-lg">
                            <img
                                src={wardnurse}
                                alt="Hospital Ward"
                                className="w-2xl h-64  mb-5 rounded-md"
                            />
                            <ClipboardList className="h-8 w-8 mb-3 text-blue-500" />
                            <h3 className="font-semibold text-lg">Ward Nurses</h3>
                            <p className="text-sm text-gray-600">
                                Log timestamped vitals for every patient on the ward,
                                see who is trending down before it becomes an emergency,
                                and hand off with confidence.
                            </p>
                        </div>
                        <div className="w-full h-full shadow p-4 gap-3 border border-gray-300 rounded-lg">
                            <img
                                src={physician}
                                alt="Physician reviewing patient records"
                                className="w-2xl h-64  mb-5 rounded-md"
                            />
                            <Brain className="h-8 w-8 mb-3 text-blue-500" />
                            <h3 className="font-semibold text-lg mb-2">Attending Physicians</h3>
                            <p className="text-sm text-gray-600">
                                Review a patient's vitals history, clinical notes, and
                                AI-generated summary before rounds — so
                                every clinical decision is backed by the full picture.
                            </p>
                        </div>
                        <div className="w-full h-full shadow p-4 border border-gray-300 rounded-lg">
                            <img
                                src={handover}
                                alt="Clinical team handover"
                                className="w-2xl h-64 mb-5 rounded-md"
                            />
                            <DocumentTextIcon className="h-8 w-8 mb-3 text-blue-500" />
                            <h3 className="font-semibold text-lg mb-2">Handover Teams</h3>
                            <p className="text-sm text-gray-600">
                                End every shift with a structured, AI-powered handover that captures what changed,
                                what's pending, and what the next team needs to act on immediately.
                            </p>
                        </div>
                    </div>

                </div>
            </section>


            {/*LOVED BY HEALTHCARE PROFESSIONALS*/}

            <section className="flex flex-col items-center justify-center gap-5 py-15 px-5">
                <h2 className="text-center text-2xl md:text-3xl lg:text-3xl font-bold mb-10">
                    Loved by Healthcare Professionals
                </h2>

                <div className="w-[85%]">

                    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-3 justify-items-center" >
                        <div className="w-full shadow px-5 pt-10 pb-8 border border-gray-300 rounded-lg">
                            <p className="text-sm text-gray-600 italic pb-5">
                                "Having the patient's full vitals history in one place, with trend indicators,
                                <br />
                                means I know exactly what changed before I even walk into the room."
                            </p>
                            <div className="flex gap-4">
                                <img
                                    src={sarahchen}
                                    alt="Dr. Sarah Chen"
                                    className="w-10 rounded-full"
                                />
                                <div className="flex flex-col">
                                    <h3 className="font-bold">Dr. Sarah Chen</h3>
                                    <p className="text-gray-600 text-sm">ICU Director, Consultant</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full shadow px-5 pt-10 pb-8 border border-gray-300 rounded-lg">
                            <p className="text-sm text-gray-600 italic pb-5">
                                "The dashboard tells me which patient needs my attention first.
                                <br />
                                I don't have to guess anymore."
                            </p>
                            <div className="flex gap-4">
                                <img
                                    src={rahmaali}
                                    alt="Nurse Rahma Ali"
                                    className="w-10 rounded-full"
                                />
                                <div className="flex flex-col">
                                    <h3 className="font-bold">Nurse Rahma Ali</h3>
                                    <p className="text-gray-600 text-sm">Ward Nurse, General Hospital</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full shadow px-5 pt-10 pb-8 border border-gray-300 rounded-lg">
                            <p className="text-sm text-gray-600 italic pb-5">
                                "Generating a structured handover used to take me 20 minutes.
                                <br />
                                CareArc's AI summary gets it done in seconds — and it's more thorough."
                            </p>
                            <div className="flex gap-4">
                                <img
                                    src={emekaokafor}
                                    alt=" Dr. Emeka Okafor"
                                    className="w-10 rounded-full"
                                />
                                <div className="flex flex-col">
                                    <h3 className="font-bold"> Dr. Emeka Okafor</h3>
                                    <p className="text-gray-600 text-sm">Shift Lead, Emergency Department</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <article className="w-[85%] bg-blue-100 flex flex-col items-center text-center gap-5 p-10 mt-5 border border-blue-300 rounded-lg">
                    <h3 className="text-2xl md:text-3xl lg:text-3xl font-bold">Ready to Transform Patient Care?</h3>
                    <p className="text-gray-500">
                        Join clinical teams already using CareArc to track patient journeys and surface what matters most.
                    </p>
                    <Link to="/dashboard">
                        <button className="flex items-center justify-center gap-2 px-2 py-2 border border-blue-700 bg-blue-500 rounded-lg text-white">
                            Get Started
                            <ArrowRightIcon className="w-3 h-4 " />
                        </button>
                    </Link>
                </article>
            </section>

            {/*GET IN TOUCH*/}

            <section className="bg-gray-100 flex flex-col items-center px-4 sm:px-8 lg:px-10 w-full">
                <div className="flex flex-col items-center gap-3 m-10 mb-10">
                    <h3 className="font-bold text-2xl md:text-3xl lg:text-3xl">Get In Touch</h3>
                    <p className="text-gray-500">Have questions? We'd love to hear from you. Our team is ready to help.</p>
                </div>
                <div className="flex w-full max-w-6xl flex-col gap-10 lg:flex-row lg:gap-20">
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-row gap-3 items-center">
                            <Mail className="w-10 h-10 px-2 rounded-full bg-blue-200 text-blue-500" />
                            <div className="flex flex-col">
                                <h3 className="font-semibold">Email</h3>
                                <p className="text-gray-500">support@CareArc.health</p>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-row gap-3 items-center">
                                <Phone className="w-10 h-10 px-2 rounded-full bg-blue-200  text-blue-500" />
                                <div className="flex flex-col">
                                    <h3 className="font-semibold">Phone</h3>
                                    <p className="text-gray-500">+234 (801) 234-5678</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-row gap-3 items-center">
                                <LocateIcon className="w-10 h-10 px-2 rounded-full bg-blue-200  text-blue-500" />
                                <div className="flex flex-col">
                                    <h3 className="font-semibold">Office</h3>
                                    <p className="text-gray-500">Abuja, Nigeria.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-10 w-[95%] md:w-full lg:w-full bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                        <h4 className="pb-4 text-lg text-center font-bold text-blue-600">Clinical Pilot Program</h4>
                        <div className="flex flex-col gap-4 text-gray-600">
                            <p>CareArc is currently being deployed in active pilot phases across select healthcare systems. We are working closely
                                with clinical departments to refine our longitudinal timeline structures, delta engines, and AI integrations.
                            </p>

                            <p>
                                If you are interested in requesting a system demonstration or participating in our next
                                onboarding group, please contact our integration team directly.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </main>

    )
}

