export const posts = [
    {
      id: 1,
      userName: 'user1',
      userImage: 'WhatsApp Image 2024-04-29 at 15.38.36.jpeg',
      videoUrl: './videos/ma mere.mp4',
      caption: 'Check out this cool video! #trending #viral',
      likes: 1500,
      views: 10000,
      comments: [
        {
          id: 1,
          userName: 'commenter1',
          userImage: 'ousseynouODC.jpeg',
          content: 'Amazing video!',
          timestamp: '2h',
          likes: 45,
          isLiked: true,
          replies: [
            {
              id: 1,
              userName: 'replier1',
              userImage: 'ousseynouODC.jpeg',
              content: 'Thank you so much!',
              timestamp: '2h',
              likes: 10,
            },
          ],
        },
      ],
      timestamp: '2 hours ago',
    },
    {
      id: 2,
      userName: 'user2',
      userImage: 'ousseynouODC.jpeg',
      videoUrl: './videos/chat.mp4',
      caption: 'Check out this cool video! #trending #viral',
      likes: 1500,
      views: 10000,
      comments: [
        {
          id: 1,
          userName: 'commenter1',
          userImage: 'ousseynouODC.jpeg',
          content: 'Amazing video!',
          timestamp: '2h',
          likes: 45,
          isLiked: true,
          replies: [
            {
              id: 1,
              userName: 'replier1',
              userImage: 'ousseynouODC.jpeg',
              content: 'Thank you so much!',
              timestamp: '2h',
              likes: 10,
            },
          ],
        },
      ],
      timestamp: '2 hours ago',
    },
  ];