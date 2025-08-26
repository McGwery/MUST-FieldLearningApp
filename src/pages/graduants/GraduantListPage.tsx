import { useEffect, useState } from "react"
import type { Graduant } from "../utils/responses/Graduant"
import { CLIENT } from "../utils/constants/apiClient"
import { ArrowPathIcon, PencilSquareIcon } from "@heroicons/react/24/outline"
import { TrashIcon } from "@heroicons/react/24/solid"
import { Link } from "react-router"

export default function GraduantListPage() {
    const [loading, setLoading] = useState(true)
    const [graduants, setGraduants] = useState<Graduant[]>([])

    useEffect(() => {
        fetchGraduants()
    }, [])

    const fetchGraduants = () => {
        setLoading(true)
        CLIENT.get("graduants")
            .then(({ data }) => {
                setGraduants(data as Graduant[])
                setLoading(false)
            })
            .catch((error) => {
                console.error("Error fetching graduants", error);
                setLoading(false)
            })
    }

    const deleteGraduant = (e: any, graduant: Graduant) => {
        e.preventDefault();
        if (confirm(`Are you sure you want to delete ${graduant.fullName}?`)) {
            CLIENT.delete(`graduants/${graduant.id}`)
                .then(({ data }) => {
                    alert("Graduant deleted successfully")
                    fetchGraduants()
                    console.log("Graduant deleted!", data);
                })
                .catch((error) => {
                    console.error("Error deleting graduant", error);
                })
        }

    }

    return (
        <div className="h-screen  flex justify-center items-start">
            <div className="w-3/4">
                <div className="flex border-b  justify-between items-center p-3">
                    <h1 className="text-3xl font-bold">Graduants</h1>
                    <Link to={"/create-graduant"} className="px-2 py-2 text-lg rounded-lg shadow-lg bg-blue-600 hover:bg-blue-300 text-white hover:text-blue-950">New Graduant</Link>
                </div>
                <div>
                    {
                        loading ? (
                            <div className="h-96 w-full flex justify-center items-center">
                                <ArrowPathIcon className="size-9 text-blue-600 animate-spin" />
                            </div>
                        ) : (<table className="border-collapse border border-slate-400 w-full">
                        <thead>
                            <tr>
                                <th className="border border-slate-300 uppercase p-2">C/N</th>
                                <th className="border border-slate-300 uppercase p-2">User Name</th>
                                <th className="border border-slate-300 uppercase p-2">Email</th>
                                <th className="border border-slate-300 uppercase p-2">Graduation Year</th>
                                <th className="border border-slate-300 uppercase p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {graduants.map((graduant, index) => {
                                return (<tr>
                                    <td className="border border-slate-300 ...">{index + 1}</td>
                                    <td className="border border-slate-300 ...">{graduant.fullName}</td>
                                    <td className="border border-slate-300 ...">{graduant.email}</td>
                                    <td className="border border-slate-300 ...">{graduant.graduationYear}</td>
                                    <td className="border border-slate-300 ...">
                                        <div className="flex items-center justify-center space-x-2">
                                            <Link to={`/edit-graduant/${graduant.id}`}>
                                                <PencilSquareIcon className="size-6 text-green-500" />
                                            </Link>
                                            <TrashIcon onClick={(e) => deleteGraduant(e, graduant)} className="size-6 text-red-500" />
                                        </div>
                                    </td>
                                </tr>)
                            })}
                        </tbody>
                    </table>)
                    }
                    
                </div>
            </div>


        </div>
    )
}