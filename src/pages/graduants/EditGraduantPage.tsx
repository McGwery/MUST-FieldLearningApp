import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { CLIENT } from "../utils/constants/apiClient";

export default function EditGraduantPage() {
    const navigate = useNavigate()
    const params = useParams();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [graduationYear, setGraduationYear] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleEmailChange = ({ target }: any) => {
        setEmail(target.value);
    }

    useEffect(() => {
        viewGraduant()
    }, [])


    const viewGraduant = () => {
        CLIENT.get(`graduants/${params.graduantId}`)
            .then(({ data }) => {
                setEmail(data.email);
                setFullName(data.fullName);
                setGraduationYear(data.graduationYear);
            })
            .catch((error) => {
                console.error("Error fetching graduant", error);
            })
    }

    function updateGraduant(e: any) {
        e.preventDefault();
        setIsSubmitting(true);
        CLIENT.put("graduants/" + params.graduantId, {
            fullName: fullName,
            email: email,
            graduationYear
        })
            .then(() => {
                setEmail("");
                setFullName("");
                setGraduationYear("");
                setIsSubmitting(false);
                navigate("/")
                // alert("Graduant saved successfully");
                // setIsSubmitting(false);
            })
            .catch((error) => {
                console.error("Error saving graduant", error);
                setIsSubmitting(false);
            })
            .finally(() => {
                //  setIsSubmitting(false);
                // optiona here -> other logics
            })
    }

    return (
        <div className="h-screen flex justify-center items-start">
            <div className="w-3/4">
                <div className="flex border-b  justify-between items-center p-3">
                    <h1 className="text-3xl font-bold">Edit Graduant</h1>
                    <Link to={"/"} className="px-2 py-2 text-lg rounded-lg shadow-lg border-2 border-blue-700  hover:bg-blue-100 text-blue-950">Go Back</Link>
                </div>

                <form onSubmit={(e) => updateGraduant(e)} className="w-full" >
                    {/* Full name */}
                    <div className="w-full">
                        <label htmlFor="fullName" className="block text-left text-sm/6 font-medium ">Full Name</label>
                        <div className="mt-1">
                            <input id="fullName" value={fullName} placeholder="John D Doe" required onChange={(e) => setFullName(e.target.value)} type="text" name="fullName" autoComplete="given-name" className=" w-full rounded-md ring-1 ring-slate-800  px-3 py-1.5 text-base text-slate-950 outline-1 outline-slate-800 -outline-offset-1  placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                        </div>
                    </div>
                    {/*  Email */}
                    <div className="w-full mt-3">
                        <label htmlFor="email" className="block text-left text-sm/6 font-medium ">Email | {email}</label>
                        <div className="mt-1">
                            <input
                                id="email"
                                type="email"
                                onChange={(e) => handleEmailChange(e)}
                                required
                                placeholder="jphndoes@gmail.com"
                                name="email"
                                value={email}
                                autoComplete="email"
                                className="w-full rounded-md ring-1 ring-slate-800  px-3 py-1.5 text-base text-slate-950 outline-1 outline-slate-800 -outline-offset-1  placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                        </div>
                    </div>
                    {/*  Graduation Year */}
                    <div className="w-full mt-3">
                        <label htmlFor="graduationYear" className="block text-left text-sm/6 font-medium ">Graduation Year</label>
                        <div className="mt-1">
                            <input id="graduationYear" value={graduationYear} onChange={(e) => setGraduationYear(e.target.value)} required type="text" placeholder="2025" name="graduationYear" autoComplete="given-name" className=" w-full rounded-md ring-1 ring-slate-800  px-3 py-1.5 text-base text-slate-950 outline-1 outline-slate-800 -outline-offset-1  placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                        </div>
                    </div>
                    {/* Submit Button */}
                    <div className="flex mt-3 items-center justify-end">
                        <button type="submit" disabled={isSubmitting} className="disabled:cursor-not-allowed cursor-pointer px-3 py-2 text-md rounded-lg shadow-lg bg-indigo-600 hover:bg-indigo-300 text-white hover:text-indigo-950">{isSubmitting ? "Updating..." : "Update Graduant"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}