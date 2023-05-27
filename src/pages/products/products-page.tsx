import { useCallback, useEffect, useRef, useState } from "react";
import { api, authorizedApi } from "../../api/api";
import { PageContainer } from "../../components/page-container/page-container";
import { useObserver } from "../../hooks/general/use-observer";

export const ProductsPage = () => {
  const [products, setProducts] = useState<any>([]);
  const [limit, setLimit] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef(null);

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    const response = await authorizedApi.get(`/products?limit=${limit}`);
    setProducts(response?.data);
    setIsLoading(false);
  }, [limit]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useObserver({
    ref: observerRef,
    onIntersect: () => {
      setLimit((prev) => prev + 10);
    },
  });

  return (
    <PageContainer destinationPage='Home' pageLink='/' pageName='Dashboard'>
      <div style={{ height: 300, overflow: "scroll", width: 300 }}>
        {products?.map((item: any) => (
          <>
            <span style={{ display: "inline-block" }}>
              {item.name} - {item.price}
            </span>
            <br />
          </>
        ))}

        <div ref={observerRef} />
      </div>
    </PageContainer>
  );
};
