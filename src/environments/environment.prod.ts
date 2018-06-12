// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  apiUrl: 'http://ec2-18-207-246-104.compute-1.amazonaws.com:9000/posts',
  sasKey: '?sv=2017-11-09&ss=b&srt=sco&sp=rwdlac&se=2022-06-04T03:24:41Z&st=2018-06-11T07:24:41Z&spr=https&sig=zV5xGGJ%2BvFK3vyb%2FJ8wrc4D%2F%2BDKzngmEfLJGRLxZY%2Fs%3D',
  blobUrl: 'https://prmp.blob.core.windows.net/'
};
