import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectSeparator } from "@/components/ui/select";
import {
  addAddress,
  deleteAddress,
  setCart,
  setSelectedAddress,
} from "@/redux/productSlice";

import axios from "axios";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const AddressForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const { cart, addresses, selectedAddress } = useSelector(
    (store) => store.product,
  );
  const [showForm, setShowForm] = useState(
    addresses?.length > 0 ? false : true,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSave = () => {
    dispatch(addAddress(formData));
    setShowForm(false);
  };

  const subtotal = cart.totalPrice;
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = parseFloat((subtotal * 0.05).toFixed(2));
  const total = subtotal + shipping + tax;

  const handlePayment = () => {
    const card = elements.getElement(CardElement);

    if (!card) {
      toast.error("Please enter card details first");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setShowPaymentPopup(true);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="max-w-7xl mx-auto grid place-items-center p-10">
      <div className="grid grid-cols-2 items-start gap-20 mt-10 max-w-7xl mx-auto">
        <div className="space-y-4 p-6 bg-white">
          {showForm ? (
            <>
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  required
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  required
                  placeholder="+91 987456321"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  required
                  placeholder="123 Street , Area"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    required
                    placeholder="Dehradun"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    required
                    placeholder="Uttarakhand"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="zip">Zip Code</Label>
                  <Input
                    id="zip"
                    name="zip"
                    required
                    placeholder="125463"
                    value={formData.zip}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    required
                    placeholder="India"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <Button onClick={handleSave} className="w-full">
                Save And Continue
              </Button>
            </>
          ) : (
            <div className="space-y-4 ">
              <h2 className="text-lg font-semibold">Saved Addresses</h2>
              {addresses.map((addr, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => dispatch(setSelectedAddress(addr))}
                    className={`border p-4 rounded-md cursor-pointer relative ${selectedAddress === addr ? "border-pink-600 bg-pink-50" : "border-gray-300"}`}
                  >
                    <p className="font-medium">{addr.fullName}</p>
                    <p className="font-medium">{addr.phone}</p>
                    <p className="font-medium">{addr.email}</p>
                    <p className="font-medium">
                      {addr.address},{addr.city},{addr.state},{addr.zip},
                      {addr.country}
                    </p>
                    <button
                      onClick={(e) => dispatch(deleteAddress(index))}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowForm(true)}
              >
                + Add New Address
              </Button>

              {/* Stripe Card Input */}
              <div className="mt-6">
                <Label>Card Details</Label>
                <div className="border p-4 rounded-lg mt-2">
                  <CardElement />
                </div>
              </div>
              <Button
                disabled={selectedAddress === null || loading}
                onClick={handlePayment}
                className="w-full bg-pink-600 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                    Processing Payment...
                  </>
                ) : (
                  "Pay Now"
                )}
              </Button>
            </div>
          )}
        </div>
        {/* Right side order summary */}
        <div>
          <Card className="w-[400px]">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>SubTotal ({cart.items.length})items</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping </span>
                <span>₹{shipping}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax ({cart.length})items</span>
                <span>₹{tax}</span>
              </div>
              <SelectSeparator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total ({cart.length})items</span>
                <span>₹{total}</span>
              </div>
              <div className="text-sm text-muted-foreground pt-4">
                <p>* Free shipping on orders over 299</p>
                <p>* 30-days return policy</p>
                <p>* Secure checkout with SSL encryption</p>
              </div>
            </CardContent>
          </Card>

          {/* STRIPE*/}
          {showPaymentPopup && (
            <div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setShowPaymentPopup(false)}
            >
              <div
                className="bg-white rounded-2xl shadow-2xl w-[500px] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* HEADER */}
                <div className="bg-indigo-600 text-white p-4 text-lg font-semibold flex justify-between items-center">
                  Payment Gateway
                  <button
                    onClick={() => setShowPaymentPopup(false)}
                    className="text-white text-xl font-semibold hover:text-gray-200"
                  >
                    ❌
                  </button>
                </div>

                {/* BODY */}
                <div className="p-8 text-center">
                  <p className="text-gray-600 mb-6">Choose Payment Result</p>

                  <div className="flex justify-center gap-6">
                    {/* SUCCESS */}
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-semibold"
                      onClick={async () => {
                        const accessToken = localStorage.getItem("accessToken");

                        await axios.post(
                          `${import.meta.env.VITE_URL}/api/v1/orders/create-order`,
                          {
                            products: cart?.items?.map((item) => ({
                              productId: item.productId._id,
                              quantity: item.quantity,
                            })),
                            tax,
                            shipping,
                            amount: total,
                            currency: "inr",
                            status: "Paid",
                            address: selectedAddress,
                          },
                          {
                            headers: {
                              Authorization: `Bearer ${accessToken}`,
                            },
                          },
                        );

                        dispatch(setCart({ items: [], totalPrice: 0 }));

                        setShowPaymentPopup(false);

                        toast.success("Payment Successful");

                        navigate("/order-success");
                      }}
                    >
                      Success
                    </button>

                    {/* FAILURE */}
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg text-lg font-semibold"
                      onClick={async () => {
                        const accessToken = localStorage.getItem("accessToken");

                        await axios.post(
                          `${import.meta.env.VITE_URL}/api/v1/orders/create-order`,
                          {
                            products: cart?.items?.map((item) => ({
                              productId: item.productId._id,
                              quantity: item.quantity,
                            })),
                            tax,
                            shipping,
                            amount: total,
                            currency: "inr",
                            status: "Failed",
                            address: selectedAddress,
                          },
                          {
                            headers: {
                              Authorization: `Bearer ${accessToken}`,
                            },
                          },
                        );

                        setShowPaymentPopup(false);

                        toast.error("Payment Failed");
                      }}
                    >
                      Failure
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
