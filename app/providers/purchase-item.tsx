import React, { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PurchaseItem } from "@/models/purchase-Item";

type PurchaseItemContextProps = {
    purchaseItemList: PurchaseItem[];
    isLoading: boolean;
    refetch: () => void;
}

const PurchaseItemContext = createContext<PurchaseItemContextProps | undefined>(undefined);

export default function PurchaseItemProvider({ children }: { children: React.ReactNode }) {
    const [purchaseItemList, setPurchaseItemList] = useState<PurchaseItem[]>([]);
    const [isLoading, setLoadingState] = useState<boolean>(false);

    async function fetchData() {
        try {
            setLoadingState(true);
            const purchaseItemAsyncStorage = await AsyncStorage.getItem("purchaseItems");
            const formattedPurchaseItemList: PurchaseItem[] = purchaseItemAsyncStorage ? JSON.parse(purchaseItemAsyncStorage) : [];
            setPurchaseItemList(formattedPurchaseItemList);
            setLoadingState(false);
        }
        catch {
            console.log("Cannot fetch PurchaseItem records from AsyncStorage");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <PurchaseItemContext.Provider value={{ purchaseItemList, isLoading, refetch: fetchData }}>
            {children}
        </PurchaseItemContext.Provider>
    );
}

export function usePurchaseItemContext() {
    const context = useContext(PurchaseItemContext);

    if (!context) {
        throw new Error("Method usePurchaseItemContext must be in PurchaseItemProvider");
    }

    return context;
}