import { Request, Response } from "express";
import * as ProductsQuery from "./commands/products/productsQuery";
import { ViewNameLookup, ErrorCodeLookup } from "./lookups/stringLookup";
import { CommandResponse, Product, ProductListingPageResponse } from "./typeDefinitions";

export let start = (req: Request, res: Response) => {
	ProductsQuery.query()
		.then((productsCommandResponse: CommandResponse<Product[]>) => {
			res.setHeader("Cache-Control", "no-cache, max-age=0, must-revalidate, no-store");
			res.render(
				ViewNameLookup.ProductListing,
				<ProductListingPageResponse>{
					products: productsCommandResponse.data
				});
		}).catch((error: any) => {
			res.setHeader("Cache-Control", "no-cache, max-age=0, must-revalidate, no-store");
			res.status((error.status || 500))
				.render(
					ViewNameLookup.ProductListing,
					<ProductListingPageResponse>{
						products: [],
						errorMessage: (error.message || ErrorCodeLookup.EC2001)
					});
		});
};
