using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace Lobby.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessageToAllUsers(string username, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", username, message);
        }

        public async Task SendMessageToSpecifiedUser(string senderUsername, string recipientConnectionId, string message)
        {
            await Clients.Client(recipientConnectionId).SendAsync("ReceiveMessage", senderUsername, message);
        }
    }
}
