'use client'

import axios from 'axios';

export async function getVideosByKeyword(keyword: string) {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: keyword,
        type: 'video',
        key: 'AIzaSyD6bEU6QbDjYv8StfzAqcKnYywEJjCDAWE',
        maxResults: 10, // Altere para o número desejado de vídeos
      },
    });

    const videoItems = response.data;
    console.log(response.data)
    return videoItems;
  } catch (error) {
    console.error('Erro ao buscar vídeos do YouTube:', error);
    return [];
  }
}