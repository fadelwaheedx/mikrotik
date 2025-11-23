import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 }, // Ramp up to 10 users over 30s
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests must complete below 500ms
    http_req_failed: ['rate<0.01'],   // http errors should be less than 1%
  },
};

export default function () {
  // Use K6_TARGET_URL env var or default to localhost
  const url = __ENV.K6_TARGET_URL || 'http://127.0.0.1:8000';

  const res = http.get(`${url}/`);
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(1);
}
