import Bluebird from "bluebird";
import { Request, Response } from "express";
import * as ProductQuery from "./commands/products/productQuery";
import * as ProductCreateCommand from "./commands/products/productCreateCommand";
import * as ProductDeleteCommand from "./commands/products/productDeleteCommand";
import * as ProductUpdateCommand from "./commands/products/productUpdateCommand";
import { ViewNameLookup, ParameterLookup, ErrorCodeLookup } from "./lookups/stringLookup";
import { CommandResponse, Product, ProductDetailPageResponse, ApiResponse, ProductSaveResponse, ProductSaveRequest } from "./typeDefinitions";

export let start = (req: Request, res: Response) => {
	ProductQuery.queryById(req.params[ParameterLookup.ProductId])
		.then((productCommandResponse: CommandResponse<Product>) => {
			res.render(
				ViewNameLookup.ProductDetail,
				<ProductDetailPageResponse>{
					product: productCommandResponse.data
				});
		}).catch((error: any) => {
			let errorMessage: (string | undefined) = "";
			if (error.status && (error.status >= 500)) {
				errorMessage = error.message;
			}

			res.status((error.status || 500))
				.render(
					ViewNameLookup.ProductDetail,
					<ProductDetailPageResponse>{
						product: <Product>{
							id: "",
							count: 0,
							lookupCode: ""
						},
						errorMessage: errorMessage
					});
		});
};

const saveProduct = (productSaveRequest: ProductSaveRequest,
	performSave: (productSaveRequest: ProductSaveRequest) => Bluebird<CommandResponse<Product>>,
	res: Response): void => {

	performSave(productSaveRequest)
		.then((saveProductCommandResponse: CommandResponse<Product>): void => {
			res.status(saveProductCommandResponse.status)
				.send(<ProductSaveResponse>{
					product: <Product>saveProductCommandResponse.data
				});
		}).catch((error: any): void => {
			res.status((error.status || 500))
				.send(<ApiResponse>{
					errorMessage: (error.message || ErrorCodeLookup.EC1002)
				});
		});
};

export let updateProduct = (req: Request, res: Response) => {
	saveProduct(req.body, ProductUpdateCommand.execute, res);
};

export let createProduct = (req: Request, res: Response) => {
	saveProduct(req.body, ProductCreateCommand.execute, res);
};

export let deleteProduct = (req: Request, res: Response) => {
	ProductDeleteCommand.execute(req.params[ParameterLookup.ProductId])
		.then((deleteProductCommandResponse: CommandResponse<void>): void => {
			res.status(deleteProductCommandResponse.status)
				.send(<ApiResponse>{});
		}).catch((error: any): void => {
			res.status((error.status || 500))
				.send(<ApiResponse>{
					errorMessage: (error.message || ErrorCodeLookup.EC1002)
				});
		});
};
