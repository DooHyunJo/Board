import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList } from 'react-native';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [editingPost, setEditingPost] = useState(null);

  const addPost = () => {
    if (newPost) {
      setPosts([...posts, { id: Date.now(), text: newPost }]);
      setNewPost('');
    }
  };

  const updatePost = () => {
    if (editingPost) {
      const updatedPosts = posts.map((post) =>
        post.id === editingPost.id ? { ...post, text: newPost } : post
      );
      setPosts(updatedPosts);
      setEditingPost(null);
      setNewPost('');
    }
  };

  const deletePost = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>게시판</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: 'gray', padding: 8, marginBottom: 10 }}
        placeholder="새로운 게시글을 입력하세요"
        value={newPost}
        onChangeText={(text) => setNewPost(text)}
      />
      {editingPost ? (
        <Button title="게시글 수정" onPress={updatePost} />
      ) : (
        <Button title="게시글 추가" onPress={addPost} />
      )}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>{item.text}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Button
                title="수정"
                onPress={() => {
                  setEditingPost(item);
                  setNewPost(item.text);
                }}
              />
              <Button title="삭제" onPress={() => deletePost(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
}
