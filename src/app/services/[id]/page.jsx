import dbConnect, { collections } from "@/lib/dbConnect";
import axios from "axios";
import { ObjectId } from "mongodb";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async ({ params }) => {
	const { id } = await params;
	const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/services/${id}`);
	const serviceDetails = res.data;

	return (
		<div className="max-w-7xl mx-auto px-4">
			<div className="relative">
				<figure>
					<Image
						src={"/assets/images/checkout/checkout.png"}
						alt=""
						width={1280}
						height={300}
						className="rounded-lg"
						priority
					/>
				</figure>
				<div className="absolute inset-0 flex items-center bg-gradient-black-to-transparent rounded-lg">
					<h1 className="text-white text-[45px] font-black pl-25">Service Details</h1>
				</div>
			</div>
			<div className="grid grid-cols-12 py-20 gap-6">
				<div className="col-span-9">
					<figure>
						<Image
							src={serviceDetails.img}
							alt={serviceDetails.title}
							width={752}
							height={400}
							className="w-full rounded-lg"
							priority
						/>
					</figure>
					<h2 className="mt-10 text-3xl font-bold mb-2">{serviceDetails.title}</h2>
					<p>{serviceDetails.description}</p>
				</div>
				<div className="col-span-3">
					<p className="text-3xl font-black mb-2">Price: {serviceDetails.price}</p>
					<Link
						href={`/checkout/${serviceDetails._id}`}
						className="bg-red-500 px-6 py-2 text-white rounded-lg cursor-pointer font-bold"
					>
						Proceed to checkout
					</Link>
				</div>
			</div>
		</div>
	);
};

export default page;
