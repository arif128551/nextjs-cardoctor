import dbConnect from "@/lib/dbConnect";
import React from "react";

const Services = async () => {
	const servicesCollection = await dbConnect("services");
	const data = await servicesCollection.find({}).toArray();
	return (
		<div className="max-w-7xl mx-auto py-30">
			<div className="max-w-[720px] mx-auto mb-12">
				<h4>Service</h4>
				<h3>Our Service Area</h3>
				<p>
					the majority have suffered alteration in some form, by injected humour, or randomised words which don't look
					even slightly believable.{" "}
				</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{data.map((service) => (
					<div key={service._id}>
						<img src={service.img} alt={service.title} width={410} height={273} />
						<h3>{service.title}</h3>
					</div>
				))}
			</div>
		</div>
	);
};

export default Services;
