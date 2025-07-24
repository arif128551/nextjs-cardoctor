import dbConnect, { collections } from "@/lib/dbConnect";
import Link from "next/link";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
const Services = async () => {
	const servicesCollection = await dbConnect(collections.servicesCollection);
	const data = await servicesCollection.find({}).toArray();
	return (
		<div className="max-w-7xl mx-auto py-30">
			<div className="max-w-[720px] mx-auto mb-12 text-center">
				<h4 className="text-xl font-bold text-red-500">Service</h4>
				<h3 className="text-5xl font-bold mb-2">Our Service Area</h3>
				<p>
					the majority have suffered alteration in some form, by injected humour, or randomised words which don't look
					even slightly believable.{" "}
				</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{data.map((service) => (
					<div key={service._id} className="border border-[#e8e8e8] p-6 rounded-lg">
						<img
							src={service.img}
							alt={service.title}
							width={410}
							height={273}
							className="w-[410px] h-[273px] object-cover object-center rounded-lg"
						/>
						<h3 className="mt-3 text-xl font-bold">{service.title}</h3>
						<div className="flex justify-between items-center mt-3 text-red-400 font-semibold">
							<p>Price: {service.price}</p>
							<Link href={`/services/${service._id}`}>
								<FaArrowRightLong />
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Services;
