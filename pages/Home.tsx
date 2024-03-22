import HomeLayout from "@/layouts/Home/HomeLayout";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import AxiosPrivateProvider from "@/context/AxiosPrivateProvider";
import HeaderComponent from "@/components/Header/Header";
import { AuthProvider, UserAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface HomeProps {}

const HomePage: React.FC<HomeProps> = () => {
  const { isAuthenticated } = UserAuth();
  const router = useRouter();

  // Redirect to "/" if user is not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);
  return (
    <>
      <AuthProvider>
        <AxiosPrivateProvider>
          <HeaderComponent />
          <DashboardLayout>
            <HomeLayout />
          </DashboardLayout>
        </AxiosPrivateProvider>
      </AuthProvider>
    </>
  );
};

export default HomePage;
