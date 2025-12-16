function trackEvent(eventName) {
  const payload = buildXDM(eventName);
  sendToMockEndpoint(payload);
}

function addToCart() {
  trackEvent("add_to_cart");
}

function buildXDM(eventName) {
  return {
    eventType: eventName,
    web: {
      webPageDetails: {
        name: digitalData.page.pageName,
        siteSection: digitalData.page.siteSection
      }
    },
    commerce: eventName === "add_to_cart" ? {
      addToCart: { value: 1 }
    } : {},
    productListItems: [{
      SKU: digitalData.product.productID,
      name: digitalData.product.productName,
      priceTotal: digitalData.product.price
    }]
  };
}

function sendToMockEndpoint(payload) {
  console.log("Mock Adobe Web SDK Payload", payload);

  fetch("https://httpbin.org/post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
}
