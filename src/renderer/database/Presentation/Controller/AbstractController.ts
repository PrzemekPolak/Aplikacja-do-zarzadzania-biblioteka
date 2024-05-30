export abstract class AbstractController
{
  public actionCompletionStatusForSaving(functionToExecute: () => any): any
  {
    try {
      functionToExecute();

      return {
        state: {
          success: true,
          message: "Pomyślnie zapisano"
        }
      }
    } catch (e: any) {
      console.log(e);
      return {
        state: {
          error: true,
          message: e.message
        },
      };
    }
  }
}
