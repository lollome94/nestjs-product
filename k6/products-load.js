import http from 'k6/http';
import { check, sleep } from 'k6';

const baseUrl = __ENV.BASE_URL || 'http://127.0.0.1:3000';

export const options = {
  stages: [
    { duration: '30s', target: 40 },
    { duration: '60s', target: 80 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.02'],
    http_req_duration: ['p(95)<500'],
  },
};

function toJson(obj) {
  return JSON.stringify(obj);
}

export default function () {
  const token = `k6-${__VU}-${__ITER}-${Date.now()}`;
  const shouldDelete = __ITER % 10 === 0;
  const page = (__ITER % 50) + 1;

  const createRes = http.post(
    `${baseUrl}/products`,
    toJson({
      name: `Load Product ${token}`,
      productToken: token,
      price: 12.34,
      stock: 10,
    }),
    { headers: { 'Content-Type': 'application/json' } },
  );

  check(createRes, {
    'create status 201': (r) => r.status === 201,
    'create has id': (r) => r.status === 201 && !!r.json('id'),
  });

  if (createRes.status !== 201) {
    return;
  }

  const id = createRes.json('id');

  const listRes = http.get(`${baseUrl}/products?page=${page}&limit=20`);
  check(listRes, {
    'list status 200': (r) => r.status === 200,
  });

  const getRes = http.get(`${baseUrl}/products/${id}`);
  check(getRes, {
    'get status 200': (r) => r.status === 200,
    'get id matches': (r) => Number(r.json('id')) === Number(id),
  });

  const updateRes = http.put(
    `${baseUrl}/products/${id}/stock`,
    toJson({ stock: 25 }),
    { headers: { 'Content-Type': 'application/json' } },
  );
  check(updateRes, {
    'update status 200': (r) => r.status === 200,
    'stock updated': (r) => Number(r.json('stock')) === 25,
  });

  if (shouldDelete) {
    const deleteRes = http.del(`${baseUrl}/products/${id}`);
    check(deleteRes, {
      'delete status 204': (r) => r.status === 204,
    });
  }

  sleep(1);
}
