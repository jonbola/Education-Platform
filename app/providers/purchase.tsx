import React, { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Purchase } from "@/models/purchase";

type PurchaseContextProps = {
    purchaseList: Purchase[];
    isLoading: boolean;
    refetch: () => void;
}

const PurchaseContext = createContext<PurchaseContextProps | undefined>(undefined);

export default function PurchaseProvider({ children }: { children: React.ReactNode }) {
    const [purchaseList, setPurchaseList] = useState<Purchase[]>([]);
    const [isLoading, setLoadingState] = useState<boolean>(false);

    async function fetchData() {
        try {
            setLoadingState(true);
            const purchaseAsyncStorage = await AsyncStorage.getItem("purchases");
            const formattedPurchaseList: Purchase[] = purchaseAsyncStorage ? JSON.parse(purchaseAsyncStorage) : [];
            setPurchaseList(formattedPurchaseList);
            setLoadingState(false);
        }
        catch {
            console.log("Cannot fetch Purchase records from AsyncStorage");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <PurchaseContext.Provider value={{ purchaseList, isLoading, refetch: fetchData }}>
            {children}
        </PurchaseContext.Provider>
    );
}

export function usePurchaseContext() {
    const context = useContext(PurchaseContext);

    if (!context) {
        throw new Error("Method usePurchaseContext must be in PurchaseProvider");
    }

    return context;
}