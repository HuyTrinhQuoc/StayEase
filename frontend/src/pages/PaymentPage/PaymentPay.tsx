import { usePayment } from '../../hooks/usePayment';
import { ProgressSteps } from "../../components/PaymentComponent/ProgressSteps.tsx";
import { CustomerInfoForm } from "../../components/PaymentComponent/CustomerInfoForm.tsx";
import { SpecialRequestForm } from "../../components/PaymentComponent/SpecialRequestForm.tsx";
import { PaymentMethodsForm } from "../../components/PaymentComponent/PaymentMethodsForm.tsx";
import { BookingSummary } from "../../components/PaymentComponent/BookingSummary.tsx";

const PaymentPage = () => {
    const {
        checkoutItems,
        form,
        vatFee,
        serviceFee,
        discount,
        totalPrice,
        promoError,
        isLoading,
        handleInputChange,
        handleMethodChange,
        handleApplyPromo,
        handleFinalSubmit
    } = usePayment();

    return (
        <main className="min-h-screen bg-[#fcf9f8] text-[#1c1b1b]">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 py-10 lg:grid-cols-12 lg:px-16">

                {/* BÊN TRÁI: KHU VỰC ĐIỀN FORM (Giữ nguyên các component con này) */}
                <section className="lg:col-span-8 space-y-8">
                    <ProgressSteps />
                    <CustomerInfoForm form={form} onChange={handleInputChange} />
                    <SpecialRequestForm form={form} onChange={handleInputChange} />
                    <PaymentMethodsForm
                        form={form}
                        onMethodChange={handleMethodChange}
                        onInputChange={handleInputChange}
                    />
                </section>

                {/* BÊN PHẢI: KHU VỰC HÓA ĐƠN VÀ THANH TOÁN */}
                <BookingSummary
                    checkoutItems={checkoutItems} // Truyền mảng các phòng vào đây
                    form={form}
                    vatFee={vatFee}
                    serviceFee={serviceFee}
                    discount={discount}
                    totalPrice={totalPrice}
                    promoError={promoError}
                    isLoading={isLoading}
                    onInputChange={handleInputChange}
                    onApplyPromo={handleApplyPromo}
                    onSubmit={handleFinalSubmit}
                />
            </div>
        </main>
    );
};

export default PaymentPage;