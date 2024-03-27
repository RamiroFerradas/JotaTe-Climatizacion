import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PaymentStatus } from "../models/PaymentStatusEnum";

const usePaymentStatus = () => {
  const searchParams = useSearchParams();
  const [openModalPayment, setOpenModalPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    const query = searchParams.get("status");
    setPaymentStatus(query);

    if (query === PaymentStatus.APPROVED) {
      setOpenModalPayment(true);
    }
  }, [searchParams]);

  return { openModalPayment, paymentStatus, setOpenModalPayment };
};

export default usePaymentStatus;
