import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 50 }, // Ramp up to 50 users over 1 minute
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests must complete below 500ms
    http_req_failed: ['rate<0.01'],   // http errors should be less than 1%
  },
};

export default function () {
  const res = http.get('http://127.0.0.1:8000/api/user');
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(1);
}
