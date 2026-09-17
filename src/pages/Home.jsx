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
        <main className="min-h-screen relative flex flex-col font-sans bg-gray-50/50">
            {/* STICKY GLASS HEADER */}
            <header className="w-full flex items-center justify-between bg-white/80 backdrop-blur-md px-4 sm:px-6 py-3 sm:py-4 fixed top-0 z-50 border-b border-gray-100 transition-all">
                <div className="flex flex-row gap-2.5 sm:gap-3 items-center">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-2 shrink-0">
                        <HeartIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-lg sm:text-xl font-bold leading-tight text-gray-900 tracking-tight">
                            CareArc
                        </h1>
                        <span className="text-gray-600 text-xs hidden sm:inline">Patient Intelligence System</span>
                    </div>
                </div>
                <Link to="/dashboard">
                    <button className="bg-blue-600 text-white text-xs md:text-sm font-semibold py-2 px-4 rounded-xl flex flex-row gap-1.5 items-center hover:shadow-lg hover:shadow-blue-500/20 hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                        Enter Dashboard
                        <ArrowRightIcon className="w-3.5 h-3.5" />
                    </button>
                </Link>
            </header>

            {/* HERO SECTION */}
            <section className="relative min-h-[90vh] pt-32 pb-24 flex flex-col justify-center items-center text-center px-6">
                <img
                    src={bgImage}
                    alt="Healthcare Dashboard"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gray-950/85"></div>

                <div className="relative z-10 flex flex-col items-center gap-6 max-w-4xl">
                    <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs md:text-sm font-semibold px-4 py-2 rounded-full backdrop-blur-xs">
                        <Activity className="h-4 w-4 text-blue-400 animate-pulse" />
                        Longitudinal Patient Intelligence Platform
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold text-center leading-tight tracking-tight">
                        See the patient's full story over time, <br className="hidden md:inline" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                            not just their last reading.
                        </span>
                    </h1>
                    <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed font-light">
                        CareArc turns fragmented patient data — vitals, clinical notes,
                        and trends into a clear, continuous story, with AI that surfaces what matters most.
                    </p>
                    <div className="flex gap-4 font-medium mt-4">
                        <Link to="/dashboard">
                            <button className="flex flex-row items-center gap-2.5 bg-blue-600 text-white text-sm px-6 py-3.5 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                                Launch Dashboard
                                <ArrowRightIcon className="w-4 h-4" />
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="flex flex-col items-center justify-center gap-4 py-20 px-6 bg-white border-y border-gray-100">
                <header className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                        How CareArc Works
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base mt-2 max-w-xl mx-auto">
                        A simple clinical workflow that builds a complete picture of every patient over time
                    </p>
                </header>
                <div className="max-w-6xl w-full mx-auto mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gray-50/50 p-6 border border-gray-200/60 rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                            <div className="bg-blue-50 text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                                <ClipboardList className="h-6 w-6" />
                            </div>
                            <h3 className="font-bold text-lg text-gray-900 mb-2">1. Record Data</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Clinicians log timestamped vitals and clinical notes for each patient with effortless forms.
                            </p>
                        </div>
                        <div className="bg-gray-50/50 p-6 border border-gray-200/60 rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                            <div className="bg-blue-50 text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                                <ArrowTrendingUpIcon className="h-6 w-6" />
                            </div>
                            <h3 className="font-bold text-lg text-gray-900 mb-2">2. Track Readings</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                CareArc builds a longitudinal timeline showing how each patient is trending over time.
                            </p>
                        </div>
                        <div className="bg-gray-50/50 p-6 border border-gray-200/60 rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                            <div className="bg-blue-50 text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                                <Brain className="h-6 w-6" />
                            </div>
                            <h3 className="font-bold text-lg text-gray-900 mb-2">3. Monitor & Act</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Intelligent status badges, delta insights, and summaries surface who needs attention first.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* POWERFUL FEATURES SECTION */}
            <section className="flex flex-col items-center justify-center gap-4 py-20 px-6">
                <header className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                        Powerful Features
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base mt-2 max-w-xl mx-auto">
                        Everything your clinical team needs to track patient journeys and make informed decisions
                    </p>
                </header>

                <div className="max-w-6xl w-full mx-auto mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white p-6 border border-gray-200/60 shadow-xs rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                            <div className="bg-blue-50 text-blue-600 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                                <ArrowTrendingUpIcon className="h-5 w-5" />
                            </div>
                            <h3 className="font-bold text-lg text-gray-900 mb-2">Longitudinal Vitals</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                Track heart rate, BP, SpO₂, temp, and resp rate across time with visual interactive trends.
                            </p>
                        </div>
                        <div className="bg-white p-6 border border-gray-200/60 shadow-xs rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                            <div className="bg-blue-50 text-blue-600 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                                <ClockIcon className="h-5 w-5" />
                            </div>
                            <h3 className="font-bold text-lg text-gray-900 mb-2">Patient Timelines</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                Chronological health journey merging vitals recordings and clinical notes in one clean view.
                            </p>
                        </div>
                        <div className="bg-white p-6 border border-gray-200/60 shadow-xs rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                            <div className="bg-blue-50 text-blue-600 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                                <ShieldCheckIcon className="h-5 w-5" />
                            </div>
                            <h3 className="font-bold text-lg text-gray-900 mb-2">Intelligent Status</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                Normal ranges & delta analysis automatically derive patient status (Stable, Watch, Review).
                            </p>
                        </div>
                        <div className="bg-white p-6 border border-gray-200/60 shadow-xs rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                            <div className="bg-blue-50 text-blue-600 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                                <DocumentTextIcon className="h-5 w-5" />
                            </div>
                            <h3 className="font-bold text-lg text-gray-900 mb-2">Clinical Notes</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                Structured notes with types — observations, treatments, reviews, and handovers.
                            </p>
                        </div>
                        <div className="bg-white p-6 border border-gray-200/60 shadow-xs rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                            <div className="bg-blue-50 text-blue-600 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                                <UserGroupIcon className="h-5 w-5" />
                            </div>
                            <h3 className="font-bold text-lg text-gray-900 mb-2">Priority Dashboard</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                See all patients at a glance, sorted dynamically by clinical triage priority.
                            </p>
                        </div>
                        <div className="bg-white p-6 border border-gray-200/60 shadow-xs rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                            <div className="bg-blue-50 text-blue-600 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                                <SparklesIcon className="h-5 w-5" />
                            </div>
                            <h3 className="font-bold text-lg text-gray-900 mb-2">AI Clinical Summaries</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                AI-powered synthesis combines vitals, deltas, and notes into actionable handovers.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHO USES CAREARC */}
            <section className="flex flex-col items-center justify-center gap-4 py-20 px-6 bg-white border-y border-gray-100">
                <header className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                        Who Uses CareArc?
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base mt-2 max-w-xl mx-auto">
                        Built for the clinical teams who track patients over days, not just moments.
                    </p>
                </header>

                <div className="max-w-6xl w-full mx-auto mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white border border-gray-200/60 shadow-sm rounded-2xl p-5 hover:shadow-md transition-all duration-200">
                            <img
                                src={wardnurse}
                                alt="Hospital Ward"
                                className="w-full h-48 object-cover mb-4 rounded-xl"
                            />
                            <div className="flex items-center gap-2 mb-2">
                                <ClipboardList className="h-5 w-5 text-blue-500" />
                                <h3 className="font-bold text-lg text-gray-900">Ward Nurses</h3>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Log timestamped vitals for every patient on the ward,
                                see who is trending down before it becomes an emergency,
                                and hand off with confidence.
                            </p>
                        </div>
                        <div className="bg-white border border-gray-200/60 shadow-sm rounded-2xl p-5 hover:shadow-md transition-all duration-200">
                            <img
                                src={physician}
                                alt="Physician reviewing patient records"
                                className="w-full h-48 object-cover mb-4 rounded-xl"
                            />
                            <div className="flex items-center gap-2 mb-2">
                                <Brain className="h-5 w-5 text-blue-500" />
                                <h3 className="font-bold text-lg text-gray-900">Attending Physicians</h3>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Review a patient's vitals history, clinical notes, and
                                AI-generated summary before rounds — so
                                every clinical decision is backed by the full picture.
                            </p>
                        </div>
                        <div className="bg-white border border-gray-200/60 shadow-sm rounded-2xl p-5 hover:shadow-md transition-all duration-200">
                            <img
                                src={handover}
                                alt="Clinical team handover"
                                className="w-full h-48 object-cover mb-4 rounded-xl"
                            />
                            <div className="flex items-center gap-2 mb-2">
                                <DocumentTextIcon className="h-5 w-5 text-blue-500" />
                                <h3 className="font-bold text-lg text-gray-900">Handover Teams</h3>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                End every shift with a structured, AI-powered handover that captures what changed,
                                what's pending, and what the next team needs to act on immediately.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* LOVED BY HEALTHCARE PROFESSIONALS */}
            <section className="flex flex-col items-center justify-center gap-4 py-20 px-6">
                <h2 className="text-center text-3xl font-bold text-gray-900 tracking-tight mb-8">
                    Loved by Healthcare Professionals
                </h2>

                <div className="w-full max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white shadow-xs p-6 border border-gray-200/60 rounded-2xl flex flex-col justify-between">
                            <p className="text-sm text-gray-600 italic leading-relaxed mb-6">
                                "Having the patient's full vitals history in one place, with trend indicators,
                                means I know exactly what changed before I even walk into the room."
                            </p>
                            <div className="flex gap-3.5 items-center">
                                <img
                                    src={sarahchen}
                                    alt="Dr. Sarah Chen"
                                    className="w-10 h-10 rounded-full object-cover border border-gray-100"
                                />
                                <div className="flex flex-col">
                                    <h3 className="font-bold text-sm text-gray-900">Dr. Sarah Chen</h3>
                                    <p className="text-gray-500 text-xs">ICU Director, Consultant</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white shadow-xs p-6 border border-gray-200/60 rounded-2xl flex flex-col justify-between">
                            <p className="text-sm text-gray-600 italic leading-relaxed mb-6">
                                "The dashboard tells me which patient needs my attention first.
                                I don't have to guess anymore."
                            </p>
                            <div className="flex gap-3.5 items-center">
                                <img
                                    src={rahmaali}
                                    alt="Nurse Rahma Ali"
                                    className="w-10 h-10 rounded-full object-cover border border-gray-100"
                                />
                                <div className="flex flex-col">
                                    <h3 className="font-bold text-sm text-gray-900">Nurse Rahma Ali</h3>
                                    <p className="text-gray-500 text-xs">Ward Nurse, General Hospital</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white shadow-xs p-6 border border-gray-200/60 rounded-2xl flex flex-col justify-between">
                            <p className="text-sm text-gray-600 italic leading-relaxed mb-6">
                                "Generating a structured handover used to take me 20 minutes.
                                CareArc's AI summary gets it done in seconds — and it's more thorough."
                            </p>
                            <div className="flex gap-3.5 items-center">
                                <img
                                    src={emekaokafor}
                                    alt="Dr. Emeka Okafor"
                                    className="w-10 h-10 rounded-full object-cover border border-gray-100"
                                />
                                <div className="flex flex-col">
                                    <h3 className="font-bold text-sm text-gray-900">Dr. Emeka Okafor</h3>
                                    <p className="text-gray-500 text-xs">Shift Lead, Emergency Dept</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-4xl bg-gradient-to-br from-blue-600 to-indigo-700 flex flex-col items-center text-center gap-5 p-10 mt-12 rounded-3xl shadow-xl shadow-blue-500/10">
                    <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Ready to Transform Patient Care?</h3>
                    <p className="text-blue-100 max-w-xl font-light text-sm md:text-base leading-relaxed">
                        Join clinical teams already using CareArc to track patient journeys and surface what matters most.
                    </p>
                    <Link to="/dashboard">
                        <button className="flex items-center justify-center gap-2 px-6 py-3 border border-transparent bg-white text-blue-600 rounded-xl text-sm font-semibold hover:bg-blue-50 hover:shadow-lg transition-all duration-200 cursor-pointer hover:-translate-y-0.5">
                            Get Started
                            <ArrowRightIcon className="w-4 h-4" />
                        </button>
                    </Link>
                </div>
            </section>

            {/* GET IN TOUCH */}
            <section className="bg-gray-100/60 border-t border-gray-200/50 py-16 flex flex-col items-center px-6 w-full">
                <div className="flex flex-col items-center gap-2 text-center mb-12">
                    <h3 className="font-bold text-3xl text-gray-900 tracking-tight">Get In Touch</h3>
                    <p className="text-gray-500 text-sm md:text-base">Have questions? Our clinical integration team is ready to help.</p>
                </div>
                <div className="flex w-full max-w-6xl flex-col gap-10 lg:flex-row lg:gap-20">
                    <div className="flex flex-col gap-6 lg:w-1/3">
                        <div className="flex flex-row gap-4 items-center">
                            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="font-bold text-sm text-gray-800">Email</h3>
                                <p className="text-gray-500 text-sm">support@CareArc.health</p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-4 items-center">
                            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                <Phone className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="font-bold text-sm text-gray-800">Phone</h3>
                                <p className="text-gray-500 text-sm">+234 (801) 234-5678</p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-4 items-center">
                            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                <LocateIcon className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="font-bold text-sm text-gray-800">Office</h3>
                                <p className="text-gray-500 text-sm">Abuja, Nigeria.</p>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-2/3 bg-white border border-gray-200/60 p-8 rounded-2xl shadow-sm">
                        <h4 className="pb-3 text-lg font-bold text-blue-600 tracking-tight">Clinical Pilot Program</h4>
                        <div className="flex flex-col gap-4 text-sm text-gray-600 leading-relaxed">
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
