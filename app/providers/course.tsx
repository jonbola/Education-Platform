import React, { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Course } from "@/models/course";

type CourseContextProps = {
    courseList: Course[];
    isLoading: boolean;
}

const CourseContext = createContext<CourseContextProps | undefined>(undefined);

export default function CourseProvider({ children }: { children: React.ReactNode }) {
    const [courseList, setcourseList] = useState<Course[]>([]);
    const [isLoading, setLoadingState] = useState<boolean>(false);

    async function fetchData() {
        try {
            setLoadingState(true);
            const courseAsyncStorage = await AsyncStorage.getItem("courses");
            const formattedCourseList: Course[] = courseAsyncStorage ? JSON.parse(courseAsyncStorage) : [];
            setcourseList(formattedCourseList);
            setLoadingState(false);
        }
        catch {
            console.log("Cannot fetch Course records from AsyncStorage");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <CourseContext.Provider value={{ courseList, isLoading }}>
            {children}
        </CourseContext.Provider>
    );
}

export function useCourseContext() {
    const context = useContext(CourseContext);

    if (!context) {
        throw new Error("Method useCourseContext must be in CourseProvider");
    }

    return context;
}