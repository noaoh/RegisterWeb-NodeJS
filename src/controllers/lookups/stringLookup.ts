export enum ParameterLookup {
	ProductId = "productId"
}

export enum ViewNameLookup {
	ProductDetail = "productDetail",
	ProductListing = "productListing"
}

export enum RouteLookup {
	// Page routing
	ProductListing = "/",
	ProductDetail = "/productDetail",

	// Page routing - parameters
	ProductIdParameter = "/:productId",
	// End page routing - parameters
	// End page routing

	// API routing
	API = "/api",
	// End API routing
}

// Error codes
export enum ErrorCodeLookup {
	// Database
	// Database - product
	EC1001 = "Product was not found.",
	EC1002 = "Unable to save product.",
	EC1003 = "Unable to delete product.",
	// End database - product
	// End database

	// General
	// General - product
	EC2001 = "Unable to retrieve product listing.",
	EC2025 = "The provided product record ID is not valid.",
	EC2026 = "Please provide a valid product lookup code.",
	EC2027 = "Please provide a valid product count.",
	EC2028 = "Product count may not be negative.",
	EC2029 = "Conflict on parameter: lookupcode."
	// End general - product
	// End general
}
// End error codes
