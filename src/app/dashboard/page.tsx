import { redirect } from "next/navigation";

const DashboardPage = () => {
    redirect("/dashboard/agencies");
}

export default DashboardPage