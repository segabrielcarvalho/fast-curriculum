export default interface IMinioProvider {
   saveFileFromBase64(fileInBase64: string): Promise<string>;
   saveFileFromBuffer(buffer: Buffer): Promise<string>;
   deleteFile(file: string): Promise<void>;
}
