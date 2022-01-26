import { CronJob } from 'cron';
import http, { RequestOptions } from 'http';
import path from 'path';
import fs from 'fs/promises';
import { exec } from 'child_process';

const { cwd } = process;

export const mySqlDumpJob = new CronJob('*/20 * * * * *', async function () {
  const backupConfigJson = JSON.parse(
    await fs.readFile(path.join(cwd(), 'mysql.backup.config.json'), 'utf-8')
  );
  const dbs: string[] = backupConfigJson.dbs;

  dbs.forEach((db) => {
    const fileName = `${Date.now()}-${db}-backup.sql`;
    const httpRequestOptions: RequestOptions = {
      hostname: 'localhost',
      port: 4000,
      path: '/',
      method: 'POST',
      headers: { 'file-name': fileName }
    };
    const dumpStream = exec(
      `docker exec mysql-db /usr/bin/mysqldump -u root --password=qwerty ${db}`
    );

    const req = http.request(httpRequestOptions);
    dumpStream.stdout?.pipe(req);
  });
});
