/* eslint-disable @typescript-eslint/no-unused-vars */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';
import {produce} from 'immer';

export const useStore = create(
  persist(
    (set, get) => ({
      CoffeeList: CoffeeData,
      BeanList: BeansData,
      CartPrice: 0,
      FavoritesList: [],
      CartList: [],
      OrderHistoryList: [],
      addToCart: (cartItem: any) =>
        set(
          produce(state => {
            let found = false;
            for (let i = 0; i < state.CartList.length; i++) {
              // Kiểm tra sản phẩm có tồn tại
              if (state.CartList[i].id === cartItem.id) {
                found = true;
                let size = false;
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  // Kiểm tra nếu giống size thì tăng số lượng item
                  if (
                    state.CartList[i].prices[j].size === cartItem.prices[0].size
                  ) {
                    size = true;
                    state.CartList[i].prices[j].quantity++;
                    break;
                  }
                  // Kiểm tra nếu không giống size thì push item đó vào mảng CartList
                  if (size === false) {
                    state.CartList[i].prices.push(cartItem.prices[0]);
                  }
                  // Sắp xếp sản phẩm
                  state.CartList[i].prices.sort((a: any, b: any) => {
                    if (a.size > b.size) {
                      return -1;
                    }
                    if (a.size < b.size) {
                      return 1;
                    }
                    return 0;
                  });
                  break;
                }
              }
              // Kiểm tra nếu sản phẩm không tồn tại
              if (found === false) {
                state.CartList.push(cartItem);
              }
            }
          }),
        ),
      calculateCartPrice: () =>
        set(
          produce(state => {
            let totalPrice = 0;
            for (let i = 0; i < state.CartList.length; i++) {
              let tempPrice = 0;
              for (let j = 0; j < state.CartList[i].prices[j].length; j++) {
                tempPrice =
                  tempPrice +
                  parseFloat(state.CartList[i].prices[j].price) *
                    state.CartList[i].prices[j].quantity;
              }
              state.CartList[i].ItemPrice = tempPrice.toFixed(2).toString();
              totalPrice = totalPrice + tempPrice;
            }
            state.CartPrice = totalPrice.toFixed(2).toString();
          }),
        ),
      addToFavoriteList: (type: string, id: string) =>
        set(
          produce(state => {
            if (type === 'Coffee') {
              for (let i = 0; i < state.CoffeeList.length; i++) {
                if (state.CoffeeList[i].id === id) {
                  if (state.CoffeeList[i].favourite === false) {
                    state.CoffeeList[i].favourite = true;
                    state.FavoritesList.unshift(state.CoffeeList[i]);
                  }
                  break;
                }
              }
            } else if (type === 'Bean') {
              for (let i = 0; i < state.BeanList.length; i++) {
                if (state.BeanList[i].id === id) {
                  if (state.BeanList[i].favourite === false) {
                    state.BeanList[i].favourite = true;
                    state.FavoritesList.unshift(state.BeanList[i]);
                  }
                  break;
                }
              }
            }
          }),
        ),
      deleteFromFavoriteList: (type: string, id: string) =>
        set(
          produce(state => {
            if (type === 'Coffee') {
              for (let index = 0; index < state.CoffeeList.length; index++) {
                if (state.CoffeeList[index].id === id) {
                  if (state.CoffeeList[index].favourite === true) {
                    state.CoffeeList[index].favourite = false;
                  }
                  break;
                }
              }
            } else if (type === 'Bean') {
              for (let index = 0; index < state.BeanList.length; index++) {
                if (state.BeanList[index].id === id) {
                  if (state.BeanList[index].favourite === true) {
                    state.BeanList[index].favourite = false;
                  }
                  break;
                }
              }
            }
            let spliceIndex = -1;
            for (let index = 0; index < state.FavoritesList.length; index++) {
              if (state.FavoritesList[index].id === id) {
                spliceIndex = index;
                break;
              }
            }
            state.FavoritesList.splice(spliceIndex, 1);
          }),
        ),
    }),

    {
      name: 'coffee-app',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);