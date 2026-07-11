import ListData from '@/app/(features)/administrador/fetch/ListData';
import { GET } from '@/shared/api/http-client/http-gateway.api';
import { IRequestOptions } from '@/shared/api/http-client/data-types/interfaces/gateway.interface';

export default async function FetchData() {
  const { success, data } = await GET(
    `${process.env.NEXT_PUBLIC_JSON_PLACE_HOLDER}/todos`,
  );

  let posts = [];
  if (success) {
    posts = data;
  } else {
    posts = [];
  }

  /* ListData es un componente del lado del cliente 
  que recibe los datos y los renderiza del lado del cliente */
  return (
    <>
      {posts?.map((post: any, i: number) => (
        <ListData post={post} key={post.id ?? i} />
      ))}
    </>
  );
}
